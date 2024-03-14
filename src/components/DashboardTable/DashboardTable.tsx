import React from "react";
import CategoryColumn from "./components/CategoryColumn";
import TagColumn from "./components/TagColumn";
import ProjectColumn from "./components/ProjectColumn";
import { fetchCategories, fetchProjects, fetchTags } from "@/app/lib/data";


export default async function DashboardTable()  {
    const [tags, categories, projects] = await Promise.all([fetchTags(), fetchCategories(), fetchProjects()]);


    return (
        <React.Fragment>
            <div className="flex max-w-[50%] w-full gap-5">
                <CategoryColumn categories={ categories } />
                <TagColumn tags={ tags } />
            </div>
            <ProjectColumn tags={ tags } categories={ categories } projects={ projects } />
        </React.Fragment>
    )
}