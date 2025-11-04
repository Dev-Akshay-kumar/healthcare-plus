const formatDoctorName = (doctor) => {
    if (!doctor?.name) return "Unknown Doctor";
    const { first, middle, last } = doctor.name;
    return [first, middle, last].filter(Boolean).join(" ");
};
export default formatDoctorName;