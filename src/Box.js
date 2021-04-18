import { Card, CardContent, Typography } from "@material-ui/core";

const Box = ({ postId, name, email, body }) => {
  return (
    <div className="box">
      <Card>
        <CardContent>
          <Typography variant="h6">
            Name: <span className="name">{name}</span>
          </Typography>
          <hr />
          <div className="descr">
            <span>Email : {email}</span>
            <br />
            <span>Post id: {postId}</span>
          </div>
          <hr />
          <Typography>
            <i>{body}</i>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Box;
