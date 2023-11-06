import { Image, ImageProps } from '@mantine/core'
import { ArchiveBox } from '@phosphor-icons/react'
import React from 'react'

type Props = {} & ImageProps

const AppLogo = (props: Props) => {
    return (
        <Image w={48} h={48} {...props} src="/logo.svg" fit="contain" />
    )
}

export default AppLogo