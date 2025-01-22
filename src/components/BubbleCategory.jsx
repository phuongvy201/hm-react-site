import React from "react";
import { Link } from "react-router-dom";

export default function BubbleCategory() {
  return (
    <div className="category-bubble container">
      <div
        className="d-flex flex-row justify-content-start overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://i.etsystatic.com/24392251/c/1754/1754/156/190/il/9bf1bb/6492586144/il_600x600.6492586144_8lg3.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Valentine's Day</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://i.etsystatic.com/35265283/c/2097/2097/446/229/il/39f13f/5845628271/il_600x600.5845628271_syem.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Easter's Day</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://i.etsystatic.com/56507840/r/il/a12098/6551934998/il_600x600.6551934998_83t9.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">3D Hoodies</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://i.etsystatic.com/36033792/c/1368/1368/333/375/il/a840da/6520059316/il_600x600.6520059316_kkj0.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Trump</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://i.etsystatic.com/50742176/r/il/2c4cb0/6190961732/il_600x600.6190961732_45px.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Baseball Jersey</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://i.etsystatic.com/27144702/r/il/eef960/6005625712/il_794xN.6005625712_p74x.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">3D Sweater</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://i.etsystatic.com/38762697/r/il/b54b2b/5840153254/il_794xN.5840153254_8mxn.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Hoodie</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://i.etsystatic.com/50170924/r/il/acb8b6/5893911338/il_600x600.5893911338_7zqn.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">
              Premium Poster Vertical Posters
            </div>
          </Link>
        </div>
      </div>
      <style>
        {`
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
