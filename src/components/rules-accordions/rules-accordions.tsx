import * as React from "react";

import { AccordionBlock } from "./accordion-block";
import { Box } from "@mui/material";
import { RULES } from "@/data/rules";

export function RulesAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      {RULES.map((rule) => (
        <AccordionBlock
          key={rule.id}
          {...rule}
          expanded={rule.id == expanded}
          onChange={handleChange(rule.id)}
        />
      ))}
    </Box>
  );
}
