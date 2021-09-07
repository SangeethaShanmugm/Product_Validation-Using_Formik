import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Create } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "46.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

export default function Product() {
  const classes = useStyles();

  const [product, setProduct] = useState([]);

  const history = useHistory();

  // const editProfile = (id) => {
  //   history.push(`/ProfileEdit/${id}`);
  // };

  function getProduct() {
    fetch("https://60f3e4de3cb0870017a8a0ac.mockapi.io/Product", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((data) => setProduct(data))
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = (id) => {
    getProduct([]);
    fetch(`https://60f3e4de3cb0870017a8a0ac.mockapi.io/Product/${id}`, {
      method: "DELETE"
    })
      .then((data) => data.json())
      .then((data) => {
        getProduct();
        alert("Product successfully deleted !");
      })
      .catch((e) => console.log(e));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid item key={product.id} container xs={12} spacing={3}>
            {product.map((data) => {
              return (
                <div
                  style={{
                    margin: `50px`,
                    display: `grid`,
                    flexDirection: `row`,
                    justifyContent: `space-between`,
                    CardContent: {
                      display: "flex",
                      justifyContent: "space-between"
                    },
                    CartActions: {
                      justifyContent: "space-between"
                    }
                  }}
                  className="e-card e-card-horizontal"
                >
                  <Card className={classes.root}>
                    <CardMedia className={classes.media} image={data.image} />

                    <CardContent>
                      <Typography variant="h5" color="inherit" component="p">
                        {data.name}
                      </Typography>
                      <Typography variant="body2" color="inherit" component="p">
                        $-{data.price}
                      </Typography>
                      <Typography variant="body2" color="inherit" component="p">
                        {data.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button
                        color="primary"
                        onClick={() => history.push(`/EditProduct/${data.id}`)}
                      >
                        Edit
                        <Create />
                      </Button>
                      <Button
                        onClick={() => deleteProduct(data.id)}
                        color="secondary"
                      >
                        Delete
                        <DeleteIcon />
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
//
