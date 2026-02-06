"use client";

import { useEffect, useState } from "react";
import ProjectGallery from "../components/ProjectGallery";

const Projects = ({ showTitle = true }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        if (isMounted) {
          const allProjects = Array.isArray(data.projects) ? data.projects : [];
          setProjects(allProjects.filter((item) => !item.isCompleted));
        }
      } catch (error) {
        if (isMounted) {
          setProjects([]);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return <ProjectGallery title={showTitle ? "Projeler" : null} projects={projects} />;
};

export default Projects;
