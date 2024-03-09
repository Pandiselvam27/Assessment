import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Model } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getAllProducts } from "../redux/logoSlice";

const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const state: any = useSelector((state: RootState) => state.logos);
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string>("");
  const [ownersFilter, setOwnersFilter] = useState<string>("");
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [colourFilters, setColourFilters] = useState<string[]>([]);

  const locations = Array.from(new Set(models.map((model) => model.location)));
  const fuelTypes = Array.from(
    new Set(models.map((model) => model.transmission))
  );
  const brands = Array.from(new Set(models.map((model) => model.model)));
  const owners = Array.from(
    new Set(models.map((model) => model.noOfOwners).sort())
  );
  const colours = Array.from(new Set(models.map((model) => model.colour)));

  const applyFilters = async () => {
    let filtered = [...models];
    if (locationFilter) {
      filtered = filtered.filter((model) =>
        model.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    if (fuelTypeFilter) {
      filtered = filtered.filter(
        (model) =>
          model.transmission.toLowerCase() === fuelTypeFilter.toLowerCase()
      );
    }
    if (ownersFilter) {
      filtered = filtered.filter(
        (model) => Number(model.noOfOwners) === Number(ownersFilter)
      );
    }
    if (brandFilters.length > 0) {
      filtered = filtered.filter((model) => brandFilters.includes(model.model));
    }
    if (colourFilters.length > 0) {
      filtered = filtered.filter((model) =>
        colourFilters.includes(model.colour)
      );
    }

    setFilteredModels(filtered);
  };

  const applyClearFilter = () => {
    setLocationFilter("");
    setFuelTypeFilter("");
    setOwnersFilter("");
    setBrandFilters([]);
    setColourFilters([]);
    setFilteredModels([]);
  };

  const getProducts = async () => {
    await dispatch(getAllProducts());
    setModels(state.allProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container spacing={2} padding={5}>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography
                fontFamily="sans-serif"
                fontSize={18}
                fontWeight="bold"
              >
                Location:
              </Typography>
              <Select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value as string)}
                placeholder="Select Location"
              >
                {locations.map((location, index) => (
                  <MenuItem key={index} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography fontFamily="sans-serif" fontSize={18} fontWeight="bold">
              Fuel Type:
            </Typography>
            <RadioGroup
              value={fuelTypeFilter}
              onChange={(e) => setFuelTypeFilter(e.target.value)}
            >
              {fuelTypes.map((type, index) => (
                <FormControlLabel
                  key={index}
                  value={type}
                  control={<Radio />}
                  label={type}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography fontFamily="sans-serif" fontSize={18} fontWeight="bold">
              Colour:
            </Typography>
            <FormGroup>
              {colours.map((colour, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={colourFilters.includes(colour)}
                      onChange={(e) =>
                        setColourFilters((prevFilters) =>
                          e.target.checked
                            ? [...prevFilters, colour]
                            : prevFilters.filter((item) => item !== colour)
                        )
                      }
                    />
                  }
                  label={colour}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography fontFamily="sans-serif" fontSize={18} fontWeight="bold">
              Owners:
            </Typography>
            <RadioGroup
              value={ownersFilter}
              onChange={(e) => setOwnersFilter(e.target.value)}
            >
              {owners.map((type, index) => (
                <FormControlLabel
                  key={index}
                  value={type}
                  control={<Radio />}
                  label={`${type} owner`}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography fontFamily="sans-serif" fontSize={18} fontWeight="bold">
              Brands:
            </Typography>
            <FormGroup>
              {brands.map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      checked={brandFilters.includes(brand)}
                      onChange={(e) =>
                        setBrandFilters((prevFilters) =>
                          e.target.checked
                            ? [...prevFilters, brand]
                            : prevFilters.filter((item) => item !== brand)
                        )
                      }
                    />
                  }
                  label={brand}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="space-around">
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={applyClearFilter}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        {filteredModels.length > 0 ? (
          filteredModels.map((model, index) => {
            return (
              <Card key={index} sx={{margin:5}}>
                <CardContent>
                  <img
                    src={model.photo}
                    alt={model.model}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <Typography variant="h5">{model.model}</Typography>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Typography>Location: {model.location}</Typography>
                    <Typography>Fuel Type: {model.transmission}</Typography>
                    <Typography>No of Owners: {model.noOfOwners}</Typography>
                    <Typography>Colour: {model.colour}</Typography>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div>
            <p>No result found</p>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Products;
