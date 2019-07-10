import React, { useEffect, useState } from "react";
import { Grid, Card, Icon } from "semantic-ui-react";
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
    console.log(createdBy);
    const data = userData.filter(obj => {
      return obj._id === createdBy;
    });
    // const user = data[0]["email"];
    // console.log(user);
    // const userName = user["firstName"];
    return (
      <a>
        <Icon name="user" />
        Created by:
      </a>
    );
  };

  return (
    <Grid
      centered
      textAlign="left"
      stackable
      columns={3}
      style={{ marginTop: "1em" }}
    >
      {response
        .filter(obj => {
          // console.log(creator(obj.createdBy));

          if (props.type === "private") {
            return obj.type === props.type && obj.createdBy === props._id;
          } else {
            return obj.type === props.type;
          }
        })
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
  );
};

export default Board;
