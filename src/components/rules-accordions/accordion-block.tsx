import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/material";
import { RuleType } from "@/data/rules";
import { isUndefined } from "lodash";

type AccordionBlockPropsType = RuleType & {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

export function AccordionBlock(props: AccordionBlockPropsType) {
  const {
    id: ruleId,
    title,
    description,
    content,

    expanded,
    onChange,
  } = props;
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${ruleId}-bh-content`}
        id={`${ruleId}-bh-header`}
      >
        <Typography sx={{ width: "40%", flexShrink: 0 }}>{title}</Typography>
        <Typography sx={{ color: "text.secondary" }}>{description ?? ""}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={"column"}>
          {content.map((el, index) => {
            const { id, style, text } = el;

            const sxStyle = {
              title: {
                fontWeight: "600",
                marginTop: index > 0 ? 1 : 0,
              },
              note: { marginTop: index > 0 ? 1 : 0 },
              "list-item": { marginTop: index > 0 ? 1 : 0 },
              text: { marginTop: index > 0 ? 0.5 : 0 },
            }[style ?? "text"];

            return (
              <Typography key={`${ruleId}-${id}`} sx={sxStyle}>
                {style == "note" && (
                  <Typography component={"span"} color={"red"}>
                    {"Примечание: "}
                  </Typography>
                )}
                {style == "list-item" && (
                  <Typography component={"span"} sx={{ fontWeight: "bold" }}>
                    {"• "}
                  </Typography>
                )}
                {text}
              </Typography>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
