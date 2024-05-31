import AddMemberForm from "@/components/forms/add-members-form";

const DefineMembership = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium text-white text-xl">Define Membership</h1>
        <p className="text-[#888888] text-sm font-light">
          Subsequent members can only be added through a voting and consensus of
          all members. These settings can be modified through a voting process,
          allowing for flexibility and adaptation.
        </p>
      </div>

      <AddMemberForm />
    </div>
  );
};

export default DefineMembership;
