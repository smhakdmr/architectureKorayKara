"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ProjectGallery from "../components/ProjectGallery";

const Projects = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
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

  return <ProjectGallery title={isHomePage ? null : "Projeler"} projects={projects} />;
};

export default Projects;
