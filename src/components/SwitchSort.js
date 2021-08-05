import { Switch, withStyles } from "@material-ui/core";
import { useState } from "react";

const SwitchSort = ({ setSort }) => {
  const [checked, setChecked] = useState(false);

  // Update state used for sorting articles by title
  const toggleSort = () => {
    setChecked((checked) => !checked);
    if (checked) {
      setSort("title-asc");
    } else {
      setSort("title-desc");
    }
  };

  const SwitchSort = withStyles({
    switchBase: {
      color: "rgb(255, 0, 0)",
      "&$checked": {
        color: "#rgb(255, 0, 0)",
      },
      "&$checked + $track": {
        backgroundColor: "#740e0e",
      },
    },
    checked: {},
    track: { backgroundColor: "#740e0e" },
  })(Switch);

  return (
    <>
      <span>Sort&nbsp;by&nbsp;:</span>
      <div className="switch-sort">
        <SwitchSort
          checked={checked}
          onChange={toggleSort}
          icon={<span className="switch-sort-desc">a</span>}
          checkedIcon={<span className="switch-sort-asc">z</span>}
        ></SwitchSort>
      </div>
    </>
  );
};

export default SwitchSort;
