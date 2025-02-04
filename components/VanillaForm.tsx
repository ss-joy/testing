function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log("conosle log stuff");
  e.currentTarget.reset();
}
import React, { useState } from "react";
import { Button } from "./ui/button";

function VanillaForm() {
  const [user, setUser] = useState({
    name: "",
    petName: "",
    age: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    petName: false,
    age: false,
  });
  console.log(touched);

  const isNameInValid = touched.name && user.name.length !== 4;

  function handleInputChange(
    identifier: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setUser((prev) => {
      return {
        ...prev,
        [identifier]: e.target.value,
      };
    });

    setTouched((prev) => ({
      ...prev,
      [identifier]: false,
    }));
  }

  function handleBlur(identifier: string) {
    setTouched((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">your name </label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={(e) => {
            handleInputChange("name", e);
          }}
          onBlur={() => handleBlur("name")}
        />
        <div>{isNameInValid && "name is invalid"}</div>

        <Button type="submit" className="mx-auto block">
          submit
        </Button>
      </form>
    </div>
  );
}

export default VanillaForm;
