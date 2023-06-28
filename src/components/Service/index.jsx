import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Service.module.scss";
import { UserInfo } from "../UserInfo";
import { ServiceSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemoveService } from "../../redux/slices/services";

export const Service = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullService,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <ServiceSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to delete service?")) {
      dispatch(fetchRemoveService(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullService })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/services/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullService })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullService })}
          >
            {isFullService ? title : <Link to={`/services/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
         
        </div>
      </div>
    </div>
  );
};
