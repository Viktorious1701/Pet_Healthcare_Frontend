import { PetHealthTrack } from "@/Models/PetHealthTrack";
import { Badge } from "@/components/ui/badge";

interface PetHealthStatusProps {
  petHealthTracks: PetHealthTrack[];
}

const getStatusBadge = (status: number) => {
  switch (status) {
    case 0:
      return "bg-danger";
    case 1:
      return "bg-yellow-400";
    case 2:
      return "bg-blue-600";
    case 3:
      return "bg-success";
  }
};

const getHealthBadge = (status: number) => {
    switch (status) {
      case 0:
        return "Severe";
      case 1:
        return "Recovering";
      case 2:
        return "Normal";
      case 3:
        return "Good";
    }
  };
const now = new Date();

const PetHealthStatus: React.FC<PetHealthStatusProps> = ({
  petHealthTracks,
}) => {
  return (
    <div className="space-y-2">
      {petHealthTracks.map((petHealthTrack) => (
        <div
          key={petHealthTrack.petHealthTrackId}
          className="flex items-center bg-ye"
        >
          <div className="dark:bg-gray-900 rounded-lg shadow-lg w-full">
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 flex justify-between">
                {petHealthTrack.description}
              </h3>
              <div className="flex justify-between">
                <p className="text-gray-500 dark:text-gray-400 ">
                  {petHealthTrack.date.toString()}
                </p>
                <Badge
                  variant="default"
                  className={getStatusBadge(petHealthTrack.status)}
                >
                  {getHealthBadge(petHealthTrack.status)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PetHealthStatus;
