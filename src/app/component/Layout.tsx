import { Box } from '@mui/material'
import { Container } from '@mui/system'

import React from 'react'

export function Layout({ children }: {children: React.ReactNode}) {
  return (
    <Box>
        <Container maxWidth="lg" 
        sx={{
            mt:4,
            mb:4,
            color: "#fff"
             }}>
        {children}
        </Container>
    </Box>
  )
}
