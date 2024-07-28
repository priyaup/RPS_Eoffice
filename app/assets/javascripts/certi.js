document.addEventListener('DOMContentLoaded', function() {
  console.log("Script is running");
  
  function validateFormData(formData) {
    const { child_name, father_name, mother_name, Dob, time, gender, place_of_birth } = formData;

    if (!child_name || !father_name || !mother_name || !Dob || !time || !gender || !place_of_birth) {
      return { valid: false, message: "All fields are required." };
    }

    return { valid: true };
  }

  function compareWithDataset(formData) {
    const dummyDataset = [
      {
        child_name: "John Doe",
        father_name: "Jane Doe",
        mother_name: "Jane Doe",
        Dob: "1990-01-01",
        time: "12:00",
        gender: "Male",
        place_of_birth: "New York"
      },
      {
        child_name: "Alice Smith",
        father_name: "Robert Smith",
        mother_name: "Anna Smith",
        Dob: "1992-05-15",
        time: "14:00",
        gender: "Female",
        place_of_birth: "Los Angeles"
      }
    ];

    return dummyDataset.some(entry =>
      entry.child_name === formData.child_name &&
      entry.father_name === formData.father_name &&
      entry.mother_name === formData.mother_name &&
      entry.Dob === formData.Dob &&
      entry.time === formData.time &&
      entry.gender === formData.gender &&
      entry.place_of_birth === formData.place_of_birth
    );
  }

  function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
      child_name: document.getElementById('certificate_child_name').value.trim(),
      father_name: document.getElementById('certificate_father_name').value.trim(),
      mother_name: document.getElementById('certificate_mother_name').value.trim(),
      Dob: document.getElementById('certificate_Dob').value.trim(),
      time: document.getElementById('certificate_time').value.trim(),
      gender: document.getElementById('certificate_gender').value.trim(),
      place_of_birth: document.getElementById('certificate_place_of_birth').value.trim()
    };

    const validation = validateFormData(formData);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    const isMatch = compareWithDataset(formData);
    if (isMatch) {
      alert("Data matches the dummy dataset.");
      // Form submission can proceed
      event.target.submit(); // Submit the form programmatically
    } else {
      alert("Data does not match the dummy dataset.");
    }
  }

  const form = document.querySelector('#new_certificate');
  if (form) {
    console.log("Form found, attaching submit event listener");
    form.addEventListener('submit', submitForm);
  }
});
