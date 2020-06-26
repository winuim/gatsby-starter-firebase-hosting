import React from "react"

interface HTMLProps {
  content: string
  className?: string
}

export const HTMLContent = ({ content, className }: HTMLProps) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

interface Props {
  content: React.ReactNode
  className?: string
}

const Content = ({ content, className }: Props) => (
  <div className={className}>{content}</div>
)

export default Content
