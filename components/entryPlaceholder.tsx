import React from "react";
import { Placeholder } from "semantic-ui-react";

export const EntryPlaceholder = () => {
  return (
    <div>
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </div>
  );
};

export default EntryPlaceholder;
