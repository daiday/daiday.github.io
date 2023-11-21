import {
  AspectRatio,
  Card,
  CardBody,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonText,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState} from "react";


interface PreviewBoxProps {
  folder: string;
}

interface PreviewData {
  title: string;
  description: string;
  image: string;
}

export default function PreviewBox({folder}: PreviewBoxProps) {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const url = `./${folder}/index.html`;

  useEffect(() => {
    axios.get(url).then(response => {
      response.data;
      const doc = new DOMParser().parseFromString(response.data, "text/html");
      const title = doc.querySelector("title")?.textContent || "";
      const description = doc.querySelector("meta[name='description']")?.getAttribute("content") || "";
      const image = doc.querySelector("meta[property='og:image']")?.getAttribute("content") || "";
      setPreviewData({title, description, image});
      setLoaded(true);
    });
    return undefined;
  }, [folder, url]);

  return (
    <LinkBox>
      <Card w={"xs"}>
        <CardBody>
          <Skeleton isLoaded={loaded}>
            <AspectRatio maxW={"xs"} ratio={4 / 3}>
              <Image rounded={"xl"} src={previewData?.image} objectFit={"cover"}></Image>
            </AspectRatio>
          </Skeleton>
          <LinkOverlay href={url}>
            <Skeleton isLoaded={loaded}>
              <Heading>{previewData?.title}</Heading>
            </Skeleton>
            <SkeletonText isLoaded={loaded}>
              <Text textAlign={"left"}>{previewData?.description}</Text>
            </SkeletonText>
          </LinkOverlay>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
