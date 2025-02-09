import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import SideItem from '../components/SideItem'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { contentAtom } from '../store/atom/content'
import { tokenAtom } from '../store/atom/token'

interface contentInterface {

  id: string;
  link?: string;
  type: string;
  title: string;
  userId: string;
  tags?: {
    id: string;
    title: string
  }[];
}[]


function Dashboard() {
  const setContent = useSetRecoilState(contentAtom);
  const contents : contentInterface[] = useRecoilValue(contentAtom)
  const [filterContents, setFilterContents] = useState<contentInterface[]>(contents);
  const [modal, setModal] = useState(false);
  const { state } = useLocation()
  // const tokenA = useRecoilValue(tokenAtom)
  // const setToken = useSetRecoilState(tokenAtom)

  useEffect(() => {
    const { token } = state;
    console.log("enter")
    console.log(token)
    // setToken(token)
    axios({
      url: "http://localhost:3000/api/v1/content",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setContent(res.data.contents)

      })
  }, [state, setContent])

  const handlefilter = (filter: string) => {
    if(filter === 'all content'){
      setFilterContents(contents)
      return
    }
    const newContents = contents.filter((content) => content.type === filter)
    setFilterContents(newContents)
  }

  const toggleModal = () => {
    setModal(!modal)
  }
  return (
    <RecoilRoot>
      <div className='w-full h-full min-h-screen flex flex-col' style={{ background: "linear-gradient(90deg, rgba(21, 45, 60, 1) 0%, rgba(8, 72, 66, 1) 28%, rgba(21, 87, 72, 1) 77%, rgba(28, 100, 111, 1) 100%)" }}>
        <Navbar onClick={toggleModal}/>

        <div className='flex'>
          <div className='w-2/8 pt-10 px-5 flex flex-col gap-2'>
            <SideItem title='All content' handlefilter={handlefilter}/>
            <SideItem title='Video' handlefilter={handlefilter}/>
            <SideItem title='Article' handlefilter={handlefilter}/>
            <SideItem title='Image' handlefilter={handlefilter}/>
            <SideItem title='Audio' handlefilter={handlefilter}/>

          </div>
          <div className='w-6/8 flex flex-wrap gap-5 pt-10 pb-10 pr-10'>
            {
              filterContents?.map((content: contentInterface) => (
                <Card key={content.id} content={content} />
              ))
            }
          </div>
        </div>
        <Modal modal={modal} toggleModal={toggleModal} token={state.token}/>
      </div>
    </RecoilRoot>
  )
}

export default Dashboard