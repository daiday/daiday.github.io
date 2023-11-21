import {
  Box,
  Heading, IconButton, useColorMode, Wrap,
} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

import PreviewBox from "./components/PreviewBox.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const {colorMode, toggleColorMode} = useColorMode();
  const [dirs, setDirs] = useState<Array<string>>([]);

  useEffect(() => {
    axios.get("./list.json").then(response => {
      setDirs(response.data);
    });
    return undefined;
  }, []);

  return (
    <>

      <Box my={2}>
        <Heading>A Simple Page</Heading>
      </Box>

      <Wrap justify={"center"} spacing={8}>
        {dirs.map((value, index) => (
          <PreviewBox key={index} folder={value}/>
        ))}
      </Wrap>

      {/*<Box margin={"auto"} display={"grid"} gap={8} justifyItems={"center"}*/}
      {/*     gridTemplateColumns={`repeat(auto-fill, minmax(320px, 1fr))`}>*/}
      {/*  {dirs.map((value, index) => (*/}
      {/*    <PreviewBox key={index} folder={value}/>*/}
      {/*  ))}*/}
      {/*</Box>*/}

      {/*{dirs.length > 2 && <Box opacity={0} w={"xs"} h={0} cursor={"default"} m={0} p={0}></Box>}*/}
      {/*{dirs.length > 3 && <Box opacity={0} w={"xs"} h={0} cursor={"default"} m={0} p={0}></Box>}*/}
      {/*{dirs.length > 4 && <Box opacity={0} w={"xs"} h={0} cursor={"default"} m={0} p={0}></Box>}*/}

      <Box position={"fixed"} right={2} top={2}>
        <IconButton onClick={toggleColorMode}
                    aria-label={"ColorMode"}
                    icon={colorMode === "light" ? <MoonIcon/> : <SunIcon/>}>
        </IconButton>
      </Box>

    </>
  );
}

export default App;
