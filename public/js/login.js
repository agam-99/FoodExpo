const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".form--signup");
const logoutButton = document.querySelector(".logout");
const meForm = document.querySelector(".form-user-data");
const updateForm = document.querySelector(".form-user-Password");
const bookBtns = document.querySelectorAll(".bookPlan");
const stripe = Stripe("pk_test_ZN4f6Z1tmqHyaKzHblk84y2K00unLLJgRr");
const login = async (email, password) => {
  // alert("Email :" + email + "   " + "Password " + " : " + password);
  try {
    const data = {
      email,
      password
    };
    const res = await axios.post("/api/user/login", data);
    console.log(res.data);
    if (res.data.status === "user logged in") {
      alert("User logged in ");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    } else {
      alert(res.data);
    }
  } catch (err) {
    console.log(err);
  }
};
const signup = async (Name, email, userName, password, confirmPassword) => {
  // alert("Email :" + email + "   " + "Password " + " : " + password);
  try {
    const data = {
      Name, email, userName, password, confirmPassword
    };
    const res = await axios.post("/api/user/signup", data);
    console.log(res.data);
    if (res.data.status === "user Signedup") {
      alert("User SignedUp");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    } else {
      alert(res.data);
    }
  } catch (err) {
    console.log(err);
  }
};
const logout = async () => {
  try {
    const res = await axios.get("/api/user/logout");
    // console.log(res);
    if (res.data.status === "user logged Out") {
      alert("User logged Out ");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (Name, email) => {
  try {
    const res = await axios.patch("/api/user/updateUser", { Name, email });
    // console.log(res);
    if (res.data.status === "user Data Updated") {
      alert("User Data Updated ");
      location.reload(true);
    }
  } catch (err) {
    console.log(err);
  }
};
const updatePassword = async (
  currentPassword,
  NewPassword,
  confirmPassword
) => {
  // alert(currentPassword + " " + NewPassword + " " + confirmPassword);
  try {
    const res = await axios.patch("/api/user/updateMyPassword", {
      currentPassword,
      NewPassword,
      confirmPassword
    });

    // console.log(res);
    if (res.data.status === "user Password Updated") {
      alert("User Data Updated ");
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
};
const bookPlan = async planId => {
  // 1. Get checkout session from API
  try {
    const session = await axios(
      `http://localhost:3000/api/bookings/checkout-session/${planId}`
    );
    console.log(session);
    // 2. Create checkout form +charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
  }
  // 3.
};
if (loginForm) {
  loginForm.addEventListener("submit", tushar => {
    tushar.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}
if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const Name = document.getElementById("Name").value;
    const email = document.getElementById("email").value;
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    signup(Name, email, userName, password, confirmPassword);
  });
}
if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}
if (meForm) {
  meForm.addEventListener("submit", e => {
    e.preventDefault();
    const Name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    updateUser(Name, email);
  });
}
if (updateForm) {
  updateForm.addEventListener("submit", e => {
    e.preventDefault();
    const currentPassword = document.getElementById("password-current").value;
    const NewPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password-confirm").value;
    updatePassword(currentPassword, NewPassword, confirmPassword);
  });
}
if (bookBtns) {
  for (var i = 0; i < bookBtns.length; i++) {
    bookBtns[i].addEventListener("click", e => {
      e.target.textContent = "Processing...";
      const planId = e.target.dataset.planId;
      // console.log(planId);
      bookPlan(planId);
    });
  }
}
