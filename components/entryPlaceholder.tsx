import React from "react";
import { Card, Placeholder, Message, Flag } from "semantic-ui-react";

export const EntryPlaceholder = () => {
  return (
    <div style={{ maxWidth: 500, marginBottom: 20, marginTop: 20 }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Card.Header>
          <Card.Meta>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Card.Meta>
          <Card.Description>
            <Message>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Message>
            <Message>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Message>
            <Message>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Message>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default EntryPlaceholder;
