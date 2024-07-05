import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { PetGet } from "@/Models/Pet";
import { getPetById } from "@/Services/PetService";
import { handleError } from "@/Helpers/ErrorHandler";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST } from "@/Route/router-const";
import { useTheme } from "@/components/vet_components/theme-provider";

const PetProfile: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const [petProfile, setPetProfile] = useState<PetGet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      if (petId) {
        try {
          const res = await getPetById(petId);
          if (res?.data) {
            setPetProfile(res.data);
            sessionStorage.setItem("petProfile", JSON.stringify(res.data));
          }
        } catch (error) {
          handleError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();
  }, [petId]);

  if (isLoading) {
    return (
      <div
        className={`p-4 flex justify-center items-center h-full ${
          theme === "dark" ? "bg-custom-darkGray text-white" : "bg-white text-black"
        }`}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!petProfile) {
    return (
      <div
        className={`p-4 flex justify-center items-center h-full ${
          theme === "dark" ? "bg-custom-darkGray text-white" : "bg-white text-black"
        }`}
      >
        <Typography variant="h4">Pet Profile Not Found</Typography>
      </div>
    );
  }

  return (
    <div
      className={`h-screen py-6 px-4 flex justify-center items-center ${
        theme === "dark" ? "bg-custom-darkGray" : "bg-white"
      }`}
    >
      <Card
        sx={{
          maxWidth: 600,
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <CardMedia
          component="img"
          sx={{ maxHeight: 500, objectFit: "cover", width: "100%", height: "auto", aspectRatio: '4/3' }}
          image={petProfile.imageUrl}
          alt={petProfile.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ color: theme === "dark" ? "#ffcccb" : "#e91e63" }}
          >
            {petProfile.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Species:</strong> {petProfile.species}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Breed:</strong> {petProfile.breed}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Gender:</strong> {petProfile.gender ? "Male" : "Female"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Weight:</strong> {petProfile.weight ? `${petProfile.weight} kg` : "Not Available"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Button
          onClick={() => navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}`)}
          sx={{
            mt: 2,
            mb: 2,
            ml: 2,
            backgroundColor: theme === "dark" ? "#ffcccb" : "#e91e63",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#ff9999" : "#d81b60",
            },
            color: "#fff",
          }}
        >
          Back to Pet List
        </Button>
      </Card>
    </div>
  );
};

export default PetProfile;
