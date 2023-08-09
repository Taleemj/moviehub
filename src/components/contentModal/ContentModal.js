import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import './contentmodal.css'


function ChildModal({ video }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>watch the trailer {<YouTubeIcon />}</button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className='trailer-modal'
        style={{border:'none'}}
      >
        <>
        <div className="trailer">
          <iframe
            src={`https://www.youtube.com/embed/${video}`}
            // width="500"
            // height="300"
            frameBorder= '0'
            title="trailer player"
            allowFullScreen
          />
        </div>
          <div onClick={handleClose} className='close'><CancelIcon /></div>
          </>
      </Modal>
    </>
  );
}

export default function ContentModal({ children, media, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
    fetchData();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key={api_key}&language=en-US`
    );
    setContent(data);
  };
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}/videos?api_key={api_key}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        className='modal'
      >
        <div className="modal-container">
          <div className="banner">
            <img
              src={`https://tmdb.org/t/p/original${content.backdrop_path}`}
              alt={content.title || content.name}
            />
          </div>
          <div className="movie-title"><h2> {content.name || content.title}</h2></div>
          <div className="content">
           <h3>{content.tagline}</h3> 
            <p>{content.overview}</p>
          </div>
          <ChildModal video={video} />
        </div>
      </Modal>
    </div>
  );
}

