import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { getKennelById } from "@/Services/KennelService";
import { Kennel } from "@/Models/Kennel";

const KennelPage: React.FC = () => {
  const { kennelId } = useParams<{ kennelId: string }>();
  const navigate = useNavigate();
  const [kennelDetails, setKennelDetails] = useState<Kennel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const storedKennelDetails = sessionStorage.getItem("kennelDetails");
    if (storedKennelDetails) {
      setKennelDetails(JSON.parse(storedKennelDetails));
      setLoading(false);
      return;
    }
    const fetchKennelDetails = async () => {
      try {
        if (kennelId) {
          const data = await getKennelById(kennelId);
          setKennelDetails(data);
          sessionStorage.setItem("kennelDetails", JSON.stringify(data));
        }
      } catch (err) {
        setError("Error fetching kennel details.");
      } finally {
        setLoading(false);
      }
    };

    fetchKennelDetails();
  }, [kennelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!kennelDetails) return <div>Kennel not found</div>;

  return (
    <div className="flex">
     
      <div className="p-6 flex-grow">
        <Button
          onClick={() => navigate(-1)}
          className="mb-4 bg-custom-darkPink text-custom-lightGrey"
        >
          Go Back
        </Button>
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Kennel Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-semibold mb-2">Kennel ID: {kennelId}</p>
          <p className="text-lg font-semibold mb-2">
            Description: {kennelDetails.description}
          </p>
          <p className="text-lg font-semibold mb-2">
            Daily Cost: ${kennelDetails.dailyCost.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KennelPage;
