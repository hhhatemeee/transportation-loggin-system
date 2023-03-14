import { Container, CssBaseline } from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { ROUTES } from '../../constants'
import { useSidebar } from '../../hooks'
import { useAuth } from '../../hooks/auth'

type AppLayoutProps = {
  children: ReactNode
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const handleOpen = () => setIsOpen(!isOpen)
  const options = useSidebar()

  return (
    <>
      <CssBaseline />
      <Header onOpen={handleOpen} open={isOpen} />
      <Sidebar options={options} open={isOpen} onClose={handleOpen}>
        <Container component={'main'} maxWidth={false}>
          {children}
        </Container>
      </Sidebar>
    </>
  )
}
