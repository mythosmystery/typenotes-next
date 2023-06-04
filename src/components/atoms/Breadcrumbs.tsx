import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  IconButton,
  Text
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Breadcrumbs = () => {
  const router = useRouter()
  const pathArray = router.asPath.split('/')
  const prevName = pathArray[pathArray.length - 2] || 'home'
  const getTo = index =>
    pathArray.slice(0, pathArray.length - 2 + index).join('/') || '/'
  return (
    <Box
      display='flex'
      alignItems='center'
      position='fixed'
      top={4}
      left={4}
      hidden={router.asPath === '/'}
    >
      {/* <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Toggle Theme"
        colorScheme="green"
        onClick={() => router.push(getTo(pathArray.length - 2))}
      /> */}
      <Breadcrumb ml={3}>
        {pathArray.map((name, i) => {
          return (
            <BreadcrumbItem fontWeight='bold' key={i}>
              {i === pathArray.length - 1 ? (
                <Text>{name}</Text>
              ) : (
                <Link href={getTo(i)}>
                  <BreadcrumbLink color='link'>{name || 'home'}</BreadcrumbLink>
                </Link>
              )}
            </BreadcrumbItem>
          )
        })}
      </Breadcrumb>
    </Box>
  )
}
