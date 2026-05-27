import { districts } from "@/data/districts";

interface StepThreeProps {
  district: string;
  postcode: string;
  onDistrictChange: (value: string) => void;
  onPostcodeChange: (value: string) => void;
}

const sortedDistricts = [...districts]
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b));

function StepThree({
  district,
  postcode,
  onDistrictChange,
  onPostcodeChange,
}: StepThreeProps) {
  return (
    <div>
      <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-white">
        Where are you based?
      </h3>
      <div className="flex flex-col gap-4">
        <select
          value={district}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full rounded-lg border border-carbon-600 bg-carbon-700 px-4 py-3 text-white focus:border-mint-500 focus:ring-1 focus:ring-mint-500 focus:outline-none"
        >
          <option value="">Select your area</option>
          {sortedDistricts.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        <div>
          <label className="mb-1 block text-sm text-carbon-400">
            Or enter your postcode
          </label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => onPostcodeChange(e.target.value)}
            placeholder="e.g. G74 1AB"
            className="w-full rounded-lg border border-carbon-600 bg-carbon-700 px-4 py-3 text-white placeholder:text-carbon-400 focus:border-mint-500 focus:ring-1 focus:ring-mint-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export { StepThree };
