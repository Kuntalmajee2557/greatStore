import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import SideItem from '../components/SideItem';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { contentAtom } from '../store/atom/content';
import LinkModal from '../components/LinkModal';

interface Content {
  id: string;
  link?: string;
  type: string;
  title: string;
  userId: string;
  tags?: {
    id: string;
    title: string;
  }[];
}

function Dashboard() {
  const setContents = useSetRecoilState(contentAtom);
  const contents: Content[] = useRecoilValue(contentAtom);
  const [filterContents, setFilterContents] = useState<Content[]>(contents);
  const [modal, setModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [link, setLink] = useState<string>("")

  const { state } = useLocation();
  const { token } = state;

  const handleFilter = (filter: string) => {
    if (filter === 'all content') {
      setFilterContents(contents);
      return;
    }
    const newContents = contents.filter((content) => content.type === filter);
    setFilterContents(newContents);
  };

  const handleDelete = (id: string) => {
    console.log(token);
    axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
      method: 'DELETE',
      data: {
        contentId: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(`Deleted content: ${id}`);

          // Update Recoil and filtered contents
          setContents((prevContents) =>
            prevContents.filter((content: Content) => content.id !== id)
          );

          setFilterContents((prevFilterContents: Content[]) =>
            prevFilterContents.filter((content) => content.id !== id)
          );
        }
      })
      .catch((error) => {
        console.error('Error deleting content:', error);
      });
  };

  const handleSetPublicLink = () => {
    axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
      method: 'POST',
      data: {
        share: true
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLink(res.data.link)
        toggleLinkModal()
      })
      .catch((error) => console.error('Error fetching content:', error));
  }

  const handleRemovePublicLink = () => {
    axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
      method: 'POST',
      data: {
        share: false
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLink("")
        toggleLinkModal()
      })
      .catch((error) => console.error('Error fetching content:', error));
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleLinkModal = () => {
    setLinkModal(!linkModal);
  };

  useEffect(() => {
    console.log('Fetching content...');
    axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setContents(res.data.contents);
        setFilterContents(res.data.contents); // Ensure filtered content updates
      })
      .catch((error) => console.error('Error fetching content:', error));
  }, [state, setContents, modal]);

  return (
    <RecoilRoot>
      <div
        className="w-full h-full min-h-screen flex flex-col"
        style={{
          background:
            'linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)',
        }}
      >
        <Navbar toggleModal={toggleModal} handleSetPublicLink={handleSetPublicLink}/>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-2/8 pt-10 px-5 flex flex-col gap-2">
            <SideItem title="All content" handlefilter={handleFilter} />
            <SideItem title="Video" handlefilter={handleFilter} />
            <SideItem title="Article" handlefilter={handleFilter} />
            <SideItem title="Image" handlefilter={handleFilter} />
            <SideItem title="Audio" handlefilter={handleFilter} />
          </div>

          {/* Main Content */}
          <div className="w-6/8 flex flex-wrap gap-5 pt-10 pb-10 pr-10">
            {filterContents.length > 0 ? (
              filterContents.map((content: Content) => (
                <Card key={content.id} content={content} onDelete={handleDelete} />
              ))
            ) : (
              <p className="text-white/80 text-xl w-full text-center mt-10">
                No content available
              </p>
            )}
          </div>
        </div>

        <Modal modal={modal} toggleModal={toggleModal} token={state.token} />
        <LinkModal linkModal={linkModal} link={link} toggleLinkModal={toggleLinkModal} handleRemovePublicLink={handleRemovePublicLink}/>
      </div>
    </RecoilRoot>
  );
}

export default Dashboard;
