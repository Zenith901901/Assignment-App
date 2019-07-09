import React, { useState } from "react";
import {
  Segment,
  Sidebar,
  Menu,
  Container,
  Icon,
  Header,
  Image,
  Divider,
  Grid,
  Popup
} from "semantic-ui-react";

const Board = props => {
  const [open, setOpen] = useState(false);

  const handleSidebarHide = () => setOpen(false);

  const handleToggle = () => setOpen(true);

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="push"
        onHide={handleSidebarHide}
        vertical
        visible={open}
      >
        <Menu.Item style={{ marginTop: "4em" }}>
          <Header as="h3">List of articles</Header>
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher dimmed={open}>
        <div
          style={{
            marginTop: "4em",
            minHeight: "100vh",
            background: "AliceBlue"
          }}
        >
          <Menu pointing secondary style={{ background: "AliceBlue" }}>
            <Menu.Item onClick={handleToggle}>
              <Icon name="sidebar" />
            </Menu.Item>

            <Container text>
              <Menu.Item active={true}>
                <Icon name="clipboard" />
                Public Content
              </Menu.Item>
              <Menu.Item active={false}>
                <Icon name="clipboard outline" />
                Private Content
              </Menu.Item>
            </Container>
          </Menu>
          <Container>
            <Header as="h1">BookMarks</Header>
            <Divider />
            <Segment>
              <Header as="h3">This is the title of article</Header>
              <Segment>
                <Menu>
                  <Popup
                    position="top left"
                    content="Remove from Bookmarks/Add to bookmarks"
                    trigger={
                      <Menu.Item position="right">
                        <Icon name="bookmark" />
                      </Menu.Item>
                    }
                  />
                  <Popup
                    position="top center"
                    content="Save this to Private Content/ delete this content"
                    trigger={
                      <Menu.Item>
                        <Icon name="clipboard outline" />
                      </Menu.Item>
                    }
                  />

                  <Popup
                    position="top right"
                    content="Save this to Public Content/delete this content"
                    trigger={
                      <Menu.Item>
                        <Icon name="clipboard" />
                      </Menu.Item>
                    }
                  />
                  <Popup
                    position="top right"
                    content="Follow/Unfollow this site"
                    trigger={
                      <Menu.Item>
                        <Icon name="plus" />
                      </Menu.Item>
                    }
                  />
                </Menu>
                <Grid columns={2}>
                  <Grid.Column width={3}>
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/image.png"
                      size="small"
                    />
                  </Grid.Column>
                  <Grid.Column width="12">
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor. Aenean massa strong. Cum
                      sociis natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nulla consequat massa
                      quis enim. Donec pede justo, fringilla vel, aliquet nec,
                      vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
                      a, venenatis vitae, justo. Nullam dictum felis eu pede
                      link mollis pretium. Integer tincidunt. Cras dapibus.
                      Vivamus elementum semper nisi. Aenean vulputate eleifend
                      tellus. Aenean leo ligula, porttitor eu, consequat vitae,
                      eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra
                      quis, feugiat a, tellus. Phasellus viverra nulla ut metus
                      varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                      ultricies nisi vel augue. Curabitur ullamcorper ultricies
                      nisi.
                    </p>
                  </Grid.Column>
                </Grid>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa strong. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Donec quam felis, ultricies nec,
                  pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                  enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
                  eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
                  vitae, justo. Nullam dictum felis eu pede link mollis pretium.
                  Integer tincidunt. Cras dapibus. Vivamus elementum semper
                  nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                  porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
                  lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                  Phasellus viverra nulla ut metus varius laoreet. Quisque
                  rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
                  Curabitur ullamcorper ultricies nisi.
                </p>
              </Segment>
            </Segment>
            <Segment>
              <Header as="h3">This is the title of article</Header>
              <Segment>
                <Menu>
                  <Popup
                    position="top left"
                    content="Remove from Bookmarks/Add to bookmarks"
                    trigger={
                      <Menu.Item position="right">
                        <Icon name="bookmark" />
                      </Menu.Item>
                    }
                  />
                  <Popup
                    position="top center"
                    content="Save this to Private Content/ delete this content"
                    trigger={
                      <Menu.Item>
                        <Icon name="clipboard outline" />
                      </Menu.Item>
                    }
                  />

                  <Popup
                    position="top right"
                    content="Save this to Public Content/delete this content"
                    trigger={
                      <Menu.Item>
                        <Icon name="clipboard" />
                      </Menu.Item>
                    }
                  />
                  <Popup
                    position="top right"
                    content="Follow/Unfollow this site"
                    trigger={
                      <Menu.Item>
                        <Icon name="plus" />
                      </Menu.Item>
                    }
                  />
                </Menu>
                <Grid columns={2}>
                  <Grid.Column width={3}>
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/image.png"
                      size="small"
                    />
                  </Grid.Column>
                  <Grid.Column width="12">
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor. Aenean massa strong. Cum
                      sociis natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nulla consequat massa
                      quis enim. Donec pede justo, fringilla vel, aliquet nec,
                      vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
                      a, venenatis vitae, justo. Nullam dictum felis eu pede
                      link mollis pretium. Integer tincidunt. Cras dapibus.
                      Vivamus elementum semper nisi. Aenean vulputate eleifend
                      tellus. Aenean leo ligula, porttitor eu, consequat vitae,
                      eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra
                      quis, feugiat a, tellus. Phasellus viverra nulla ut metus
                      varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                      ultricies nisi vel augue. Curabitur ullamcorper ultricies
                      nisi.
                    </p>
                  </Grid.Column>
                </Grid>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa strong. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Donec quam felis, ultricies nec,
                  pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                  enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
                  eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
                  vitae, justo. Nullam dictum felis eu pede link mollis pretium.
                  Integer tincidunt. Cras dapibus. Vivamus elementum semper
                  nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                  porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
                  lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                  Phasellus viverra nulla ut metus varius laoreet. Quisque
                  rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
                  Curabitur ullamcorper ultricies nisi.
                </p>
              </Segment>
            </Segment>
          </Container>
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default Board;
