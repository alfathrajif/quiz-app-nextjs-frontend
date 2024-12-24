"use server";
import { API_URL } from "@/constants";
import sectionService from "@/services/section";
import { WebResponse } from "@/types";
import { CreateSection, Section } from "@/types/section";

export async function createSection(
  tryout: CreateSection
): Promise<WebResponse<Section>> {
  try {
    const res = await sectionService.createSection(tryout);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error creating section:", err);
      throw new Error(`Create error: ${err.message}`);
    } else {
      console.error("Unknown error creating section:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getSections(tryoutSlug: string): Promise<Section[]> {
  const url = `${API_URL}/sections?tryout_slug=${tryoutSlug}`;

  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching sections:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch sections"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching sections:", error);
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      console.error("Unknown error fetching sections:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getSection(slug: string): Promise<Section> {
  const url = `${API_URL}/sections/${slug}`;

  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching section:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch section"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching section:", error);
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      console.error("Unknown error fetching section:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editSection(
  section: CreateSection,
  uuid: string
): Promise<WebResponse<Section>> {
  try {
    const res = await sectionService.editSection(section, uuid);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error editing section:", err);
      throw new Error(`Edit error: ${err.message}`);
    } else {
      console.error("Unknown error editing section:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function softDeleteSection(
  uuid: string
): Promise<WebResponse<null>> {
  try {
    const res = await sectionService.softDeleteSection(uuid);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error deleting section:", err);
      throw new Error(`Delete error: ${err.message}`);
    } else {
      console.error("Unknown error deleting section:", err);
      throw new Error("An unknown error occurred");
    }
  }
}
