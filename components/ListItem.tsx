import React from 'react'
import Link from 'next/link'


type Props = {
  data: {title: string}
}

const ListItem = ({ data }: Props) => (
<p>{data.title}</p>
)

export default ListItem
