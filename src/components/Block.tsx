import { Block as BlockType } from "../types/Block";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "../constants/colors";

interface Props {
  block: BlockType;
}

const BoxDetail = styled(Box)({
  backgroundColor: colors.lightgray,
  borderRadius: "2px",
  marginBottom: "8px",
});

const TypographyHeading = styled(Typography)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: colors.blue,
  padding: "8px",
});

const TypographySecondaryHeading = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  color: colors.darkgray,
  padding: "0 8px 8px 8px",
}));

export default function Block(props: Props) {
  function getIndexWithZeroes(index: number) {
    if (index < 10) return "00" + index;
    if (index < 100) return "0" + index;
    return index;
  }

  return (
    <BoxDetail>
      <TypographyHeading>
        {getIndexWithZeroes(props.block.index)}
      </TypographyHeading>
      <TypographySecondaryHeading>
        {props.block.data}
      </TypographySecondaryHeading>
    </BoxDetail>
  );
}
