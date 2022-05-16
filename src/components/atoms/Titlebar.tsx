import { Box, Text } from "@chakra-ui/react"

export const Titlebar = () => {
  return (
    <Box position="fixed" top={-12} left="40%" px={"28"} pt={12} pb={3} borderRadius={20}>
      <Text fontSize="3xl" bgGradient="linear(to-l, heroGradientEnd, heroGradientStart)" bgClip="text">
        Typenotes
      </Text>
    </Box>
  )
}
