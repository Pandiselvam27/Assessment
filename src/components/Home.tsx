import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getModels, submitModel } from "../redux/logoSlice";
import { Logo, Model } from "../type";
import { AppDispatch, RootState } from "../redux/store";
import homeStyle from "../helper/homeStyle";
import { v4 as uuidv4 } from "uuid";

const initialState: Model = {
  id: null,
  model: "",
  location: "",
  colour: "",
  noOfOwners: 0,
  yearOfManufacture: "",
  transmission: "",
  insuranceValidUpto: "",
  externalFitments: "",
  kms: 0,
  photo: "",
};

function Home() {
  const dispatch: AppDispatch = useDispatch();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [formData, setFormData] = useState<Model>(initialState);
  const [createdModel, setCreatedModel] = useState<any>({});
  const classes = homeStyle();
  const state: any = useSelector((state: RootState) => state.logos);
  const logos = state.data;

  const handleLogoClick = (model: string) => {
    setFormData(initialState);
    setCreatedModel({});
    setShowForm(true);
    setSelectedModel(model);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject: { [key: string]: any } = {};
  
    await Promise.all(
      Array.from(formData.entries()).map(async ([key, value]) => {
        if (key === "photo" && value instanceof File) {
          formObject[key] = await getBase64Image(value);
        } else {
          formObject[key] = value;
        }
      })
    );
  
    formObject["id"] = uuidv4();
  
    try {
      await dispatch(submitModel(formObject));
      setFormData(initialState);
      setSelectedModel("");
      setShowForm(false);
      setCreatedModel(formObject);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  const getBase64Image = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to base64."));
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read the image file."));
      };
      reader.readAsDataURL(file);
    });
  };
  

  const getAvailableModels = () => {
    dispatch(getModels());
  };

  useEffect(() => {
    getAvailableModels();
  }, []);

  return (
    <div>
      <Paper className={classes.paper} style={{ backgroundColor: "#ebebeb" }}>
        <Grid container spacing={3}>
          {logos.map((logo: Logo) => (
            <Grid item key={logo.id}>
              <Card
                className={classes.card}
                style={{ borderRadius: "15px" }}
                onClick={() => handleLogoClick(logo.name)}
              >
                <CardContent>
                  <img
                    className={classes.media}
                    src={logo.image}
                    title={logo.name}
                    alt="logo"
                  />
                  <Typography variant="h6">{logo.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {logos.length > 0 && (
            <Grid item>
              <Card className={classes.card} style={{ borderRadius: "15px" }}>
                <CardContent>
                  <Typography variant="h5" color="purple" fontWeight={600}>
                    MORE
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>Model</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      name="model"
                      value={selectedModel}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>Location</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      name="location"
                      value={formData.location}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>Colour</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      name="colour"
                      value={formData.colour}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>No of Owners</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      type="number"
                      name="noOfOwners"
                      value={formData.noOfOwners}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>Year of Manufacture</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      type="date"
                      name="yearOfManufacture"
                      value={formData.yearOfManufacture}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>Transmission</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      name="transmission"
                      value={formData.transmission}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>Insurance Valid Upto</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      type="date"
                      name="insuranceValidUpto"
                      value={formData.insuranceValidUpto}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>External Fitments</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      name="externalFitments"
                      value={formData.externalFitments}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>Kms</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      name="kms"
                      type="number"
                      value={formData.kms}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <Typography>Photo</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      className={classes.formControl}
                      fullWidth
                      variant="outlined"
                      type="file"
                      name="photo"
                      value={formData.photo}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        )}
        {createdModel && Object.keys(createdModel).length > 0 && (
          <div>
            <h2>Form Data:</h2>
            <pre>{JSON.stringify(createdModel, null, 2)}</pre>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Home;
