import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core/styles";

import { Post } from "../components/Post";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { fetchServices } from "../redux/slices/services";
import { Service } from "../components/Service";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f2f2f2",
    color: "#333",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    margin: "auto",
    marginTop: 0,
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  carouselContainer: {
    marginBottom: theme.spacing(4),
    "& .CarouselItem": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      padding: theme.spacing(2),
      height: "65vh",
      "& img": {
        maxWidth: "100%",
        height: "400px",
      },
      "& h1": {
        color: "#fff",
        fontSize: "54px",
        fontWeight: "bold",
        margin: 0,
        textShadow: "2px 2px 4px black", // Add black text outline
      },
    },
  },
  
  gridContainer: {
    backgroundColor: "#f2f2f2",
    marginBottom: theme.spacing(3),
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    marginLeft: 0,
  },
  postContainer: {
    backgroundColor: "#fff",
    minWidth: "25%",
    paddingRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
  },
  sectionPost: {
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
}));

export const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { items: posts, status: postsStatus } = useSelector(
    (state) => state.posts.posts
  );
  const { items: services, status: servicesStatus } = useSelector(
    (state) => state.services.services
  );
  const { items: tags, status: tagsStatus } = useSelector(
    (state) => state.posts.tags
  );
  const slides = [
    {
      title: "Slide 1",
      imageUrl:
        "https://rusanov-d/api/uploads/RobloxScreenShot20230605_131002741.png",
    },
    {
      title: "Slide 2",
      imageUrl:
        "https://rusanov-d/api/uploads/RobloxScreenShot20230605_131058204.png",
    },
    {
      title: "Slide 3",
      imageUrl:
        "https://rusanov-d/api/uploads/RobloxScreenShot20230605_131031179.png",
    },
  ];
  const isPostsLoading = postsStatus === "loading";
  const isTagsLoading = tagsStatus === "loading";
  const isServicesLoading = servicesStatus === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchServices());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Carousel className={classes.carouselContainer} autoPlay>
        {slides.map((slide, index) => (
          <div
            className="CarouselItem"
            key={index}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <h1>{slide.title}</h1>
          </div>
        ))}
      </Carousel>

      <section className={[classes.section, classes.sectionPost]}>
        <h2 className={classes.sectionTitle}>Latest Posts</h2>
        <Grid
          style={{ marginLeft: 0 }}
          container
          spacing={1}
          className={classes.gridContainer}
        >
          {isPostsLoading ? (
            <Post key="loading" isLoading={true} />
          ) : (
            posts.slice(0, 4).map((post, index) => (
              <Grid
                xs={2}
                item
                key={post._id}
                className={`${classes.postContainer} ${
                  index % 4 === 3 ? "" : classes.postContainerWithMargin
                }`}
              >
                <Post
                  id={post._id}
                  title={post.title}
                  imageUrl={
                    post.imageUrl ? `https://rusanov-d/api${post.imageUrl}` : ""
                  }
                  user={post.user}
                  createdAt={post.createdAt}
                  viewsCount={post.viewsCount}
                  commentsCount={3}
                  tags={Array.isArray(post.tags) ? post.tags : [post.tags]}
                  isEditable={userData?._id === post.user._id}
                />
              </Grid>
            ))
          )}
        </Grid>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Popular Services</h2>
        <Grid container spacing={2} className={classes.gridContainer}>
          {isServicesLoading ? (
            <Grid xs={3} item className={classes.postContainer}>
              <Service key="loading" isLoading={true} />
            </Grid>
          ) : (
            services.slice(0, 4).map((service) => (
              <Grid
                xs={3}
                item
                key={service._id}
                className={classes.postContainer}
              >
                <Service
                  id={service._id}
                  title={service.title}
                  imageUrl={
                    service.imageUrl ? `https://rusanov-d/api${service.imageUrl}` : ""
                  }
                  user={service.user}
                  createdAt={service.createdAt}
                  viewsCount={service.viewsCount}
                  commentsCount={3}
                  tags={Array.isArray(service.tags) ? service.tags : [service.tags]}
                  isEditable={userData?._id === service.user._id}
                />
              </Grid>
            ))
          )}
        </Grid>
      </section>
    </div>
  );
};
