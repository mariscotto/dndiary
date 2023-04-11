import React from "react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody} from '@coreui/react';

export default function Entry(props) {
  return (
        <CAccordionItem itemKey={props.session}>
          <CAccordionHeader>Session {props.session}</CAccordionHeader>
          <CAccordionBody>
            {props.content}
          </CAccordionBody>
        </CAccordionItem>
  );
}
