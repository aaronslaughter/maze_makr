import React from 'react'
import GitHubMark from '../assets/GitHub-Mark-64px.png'
import LinkedInLogo from '../assets/LI-In-Bug.png'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Container>
      <a href="https://github.com/aaronslaughter/maze_makr" target="_blank" rel="noopener noreferrer"><img src={GitHubMark}/></a>
      <a href="https://www.linkedin.com/in/aaron-slaughter1/" target="_blank" rel="noopener noreferrer"><img src={LinkedInLogo} style={{width:64 + 'px'}}/></a>
    </Container>
  )
}

export default Footer

const Container = styled.footer`
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`
