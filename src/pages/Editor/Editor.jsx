//icons

import moreIcon from "../../assets/icons/Group-2.svg";
import saveIcon from "../../assets/icons/Group-3.svg";
import undoIcon from "../../assets/icons/Group.svg";
import downloadIcon from "../../assets/icons/Group-1.svg";
import backArrow from "../../assets/icons/back-button.svg";
import SaturationIcon from "../../assets/icons/saturation.svg";
import BrightnessIcon from "../../assets/icons/brightness.svg";
import BlendIcon from "../../assets/icons/blend-icon.svg";
import ContrastIcon from "../../assets/icons/contrast.svg";
import VibranceIcon from "../../assets/icons/vibrance.svg";
import HueIcon from "../../assets/icons/hue.svg";
import PixellateIcon from "../../assets/icons/pixellate.svg";
import BlurIcon from "../../assets/icons/blur.svg";
import NoiseIcon from "../../assets/icons/noise.svg";
import PresetIcon from "../../Components/PresetIcon/PresetIcon";
import FilterIcon from "../../Components/FilterIcon/FilterIcon";

//components
import SinglePreset from "../../Components/SinglePreset/SinglePreset";
import SingleFilter from "../../Components/SingleFilter/SingleFilter";
import EditNameModal from "../../Components/EditNameModal/EditNameModal";
import Blend from "../../Components/Blend/Blend";

//misc
import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Editor.css";
import { get,update,set } from "idb-keyval";

//functions
import applyPreset from "../../libs/applyPreset";
import applyFilter from "../../libs/applyFilter";

function Editor() {
  const navigate = useNavigate();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const canvasRef = useRef(null);
  const [presetToApply, setPresetToApply] = useState("");
  const [filterToApply, setFilterToApply] = useState("");
  const [showPresets, setShowPresets] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  const [imageObj, setImageObj] = useState({});
  const [userHasSaved, setUserHasSaved] = useState(true)

  const presets = [
    "Original",
    "Kodachrome",
    "Gotham",
    "Love",
    "Sepia",
    "Orange",
    "Grayscale",
    "B/W",
    "Snow",
    "Polaroid",
    "Dark Day",
  ];

  const filters = [
    { name: "Brightness", icon: BrightnessIcon },
    { name: "Saturation", icon: SaturationIcon },
    { name: "Contrast", icon: ContrastIcon },
    { name: "Vibrance", icon: VibranceIcon },
    { name: "Hue", icon: HueIcon },
    { name: "Noise", icon: NoiseIcon },
    { name: "Blur", icon: BlurIcon },
    { name: "Pixellate", icon: PixellateIcon },
    { name: "Blend", icon: BlendIcon },
  ];

  const mappedPresets = presets.map((preset) => {
    return (
      <SinglePreset
        presetToApply={presetToApply}
        setPresetToApply={setPresetToApply}
        src={imageObj.src}
        name={preset}
        setUserHasSaved={setUserHasSaved}
      />
    );
  });

  const mappedFilters = filters.map(({ name, icon }) => {
    return (
      <SingleFilter
        filterToApply={filterToApply}
        setFilterToApply={setFilterToApply}
        key={name}
        name={name}
        setUserHasSaved={setUserHasSaved}
        src={imageObj.src}
        icon={icon}
      />
    );
  });

  function handleBackNavigation() {
    if (userHasSaved) {
      async function updateEditedImages(){
        try{
          const editedImages = await get("edited-images")
          const newEditedImages = editedImages.filter((image) => image.id !== imageObj.id)
          newEditedImages.push(imageObj)
          set("edited-images", newEditedImages)   
          navigate("/");     

        }
        catch (err){
          console.error(err)
        }
      }
      updateEditedImages()
    }else{
      alert("Please Save before going back to your gallery")
    }
  }

  function clearAllChanges() {}

  function handleSave() {
    const newSrc = canvasRef.current.toDataURL();
    update('image-clicked', (val) => {
      return {name : val.name, id : val.id, src: newSrc}
    });
    setUserHasSaved(true)
  }

  function handleDownload() {
    const dataURL = canvasRef.current.toDataURL();
    const aElem = document.createElement("a");
    aElem.href = dataURL;
    aElem.download = name;
    aElem.click();
  }

  function nameToDisplay() {
    if (showPresets == true && showFilters == false) {
      return presetToApply;
    } else if (showPresets == false && showFilters == true) {
      return filterToApply;
    }
  }

  function happenOnInitial() {
    console.log("starting");
    get("image-clicked").then((imageObject) => {
      setImageObj(imageObject);
      const image = new Image();
      image.src = imageObject.src;
      image.onload = function () {
        canvasRef.current.width = image.width;
        canvasRef.current.height = image.height;
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(image, 0, 0);

        presetToApply !== "" && applyPreset(ctx, canvasRef, presetToApply);
      };
    });

    console.log("finished");
  }

  useLayoutEffect(() => {
    document.title = "Image Editor | Editor";
    happenOnInitial();
  }, [presetToApply]);

  useEffect(() => {
    console.log(filterToApply);
    applyFilter(canvasRef, imageObj.src, rangeValue, filterToApply);
    setUserHasSaved(false)
  }, [rangeValue]);

  return (
    <main className="editor-main">
      <div className="left-side">
        <div className="top-controls">
          <div
            tabIndex={0}
            onClick={() => handleBackNavigation()}
            className="back"
          >
            <button>
              <img src={backArrow} alt="go back to your gallery" />
            </button>
          </div>

          <div className="other-controls">
            <button>
              <img src={undoIcon} alt="remove your last filter" />
            </button>

            <button>
              <img
                onClick={() => handleDownload()}
                src={downloadIcon}
                alt="download your edited image"
              />
            </button>

            <button>
              <img 
              onClick={(()=> handleSave())}
              src={saveIcon} 
              alt="save your changes" />
            </button>

            <button onClick={() => setShowMoreOptions((prev) => !prev)}>
              <img src={moreIcon} alt="view more settings" />
            </button>

            {showMoreOptions && (
              <div className="image-options">
                <button>Rename</button>
                <button>Clear all changes</button>
              </div>
            )}
          </div>
        </div>

        <canvas ref={canvasRef} className="image-to-edit"></canvas>

        <div className="name-and-input">
          <p>{nameToDisplay()}</p>

          {showFilters && filterToApply !== "Blend" && (
            <>
              <small>{rangeValue}</small>
              <input
                min={-100}
                max={100}
                value={rangeValue}
                onChange={(e) => setRangeValue(parseInt(e.target.value))}
                type="range"
                name=""
                id=""
              />
            </>
          )}
        </div>

        {filterToApply == "Blend" && (
          <Blend src={imageObj.src} canvasRef={canvasRef} />
        )}
      </div>

      <div className="right-side">
        {showPresets && (
          <div className="presets-container">{mappedPresets}</div>
        )}

        {showFilters && (
          <div className="filters-container">{mappedFilters}</div>
        )}

        <div className="switcher">
          <button
            className={showPresets ? "preset-active" : ""}
            onClick={() => {
              setShowFilters(false);
              setShowPresets(true);
            }}
          >
            <PresetIcon showPresets={showPresets} />
          </button>

          <button
            onClick={() => {
              setShowPresets(false);
              setShowFilters(true);
            }}
          >
            <FilterIcon showFilters={showFilters} />
          </button>
        </div>

        <EditNameModal />
      </div>
    </main>
  );
}

export default Editor;
