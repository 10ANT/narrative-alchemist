import flagDe from "@/assets/images/flags/de.svg";
import flagEs from "@/assets/images/flags/es.svg";
import flagIn from "@/assets/images/flags/in.svg";
import flagIt from "@/assets/images/flags/it.svg";
import flagRu from "@/assets/images/flags/ru.svg";
import flagUs from "@/assets/images/flags/us.svg";
import Image from "next/image";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";

const Flag = () => {
  const flags = [
    {
      flag: flagUs,
      language: "English",
    },
    {
      flag: flagIn,
      language: "Hindi",
    },
    {
      flag: flagDe,
      language: "German",
    },
    {
      flag: flagIt,
      language: "Italian",
    },
    {
      flag: flagEs,
      language: "Spanish",
    },
    {
      flag: flagRu,
      language: "Russian",
    },
  ];

  return (
    <div className="topbar-item">
      <Dropdown align={"end"}>
        <DropdownToggle
          as={"button"}
          className="topbar-link drop-arrow-none"
          data-bs-toggle="dropdown"
          data-bs-offset="0,32"
          type="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <Image
            src={flagUs}
            alt="user-image"
            className="w-100 rounded"
            height={18}
            id="selected-language-image"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {flags.map((flag, idx) => (
            <a
              href=""
              className="dropdown-item"
              key={idx}
              data-translator-lang="en"
            >
              <Image
                src={flag.flag}
                alt="user-image"
                className="me-1 rounded"
                height={18}
                data-translator-image
              />{" "}
              <span className="align-middle">{flag.language}</span>
            </a>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Flag;
