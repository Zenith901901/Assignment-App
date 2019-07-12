import React, { useEffect, useState } from "react";
import { Grid, Card, Icon, Header, Image } from "semantic-ui-react";
import axios from "axios";

const Board = props => {
  const [response, setResponse] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get(`${props.dbUrl}/sites`)
      .then(res => {
        setResponse(res.data);
        axios
          .get(`${props.dbUrl}/users`)
          .then(res => {
            setUserData(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const creator = createdBy => {
    const data = userData.filter(obj => {
      return obj._id === createdBy;
    });
    if (data[0]) {
      const userName = `${data[0].firstName} ${data[0].lastName}`;
      return (
        <a>
          <Icon name="user" />
          Created by: {userName}
        </a>
      );
    }
    return null;
  };
  const type = props.type === "private" ? "My Private" : "Public";

  return (
    <React.Fragment>
      <Header as="h2" textAlign="center" style={{ marginTop: "1em" }}>
        <Image src={require("../../current_test_icon.ico")} size="small" />
        {type} Content
      </Header>
      <Grid
        centered
        textAlign="left"
        stackable
        columns={3}
        style={{ marginTop: "1em" }}
      >
        {response
          .filter(obj => {
            if (props.type === "private") {
              return obj.type === props.type && obj.createdBy === props._id;
            } else {
              return obj.type === props.type;
            }
          })
          .reverse()
          .map(obj => (
            <Grid.Column stretched>
              <Card
                image={obj.image}
                header={obj.title}
                meta={<a href={obj.url}>{obj.url}</a>}
                description={obj.description}
                extra={creator(obj.createdBy)}
              />
            </Grid.Column>
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default Board;
