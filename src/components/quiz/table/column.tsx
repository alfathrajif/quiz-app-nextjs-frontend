"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Quiz } from "@/types/quiz";

export const columns: ColumnDef<Quiz>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="#"
        className="ml-2.5 text-xs"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2 min-h-11 items-center">
          <span className="font-medium">{row.getValue("number")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const slug = row.original.slug;

      return (
        <Link
          href={`/admin/quizzes/r/${slug}`}
          className="flex items-center space-x-2 h-11 px-3 hover:underline">
          <span className="font-medium">{row.getValue("title")}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">{row.getValue("description")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => {
      const user = row.original.created_by.user;

      return (
        <div className="ml-3 flex items-center gap-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="#" />
            <AvatarFallback>
              <User className="w-5 h-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="capitalize text-primary text-xs">
              {user.role.name}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "questions_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of Questions" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">{row.getValue("questions_count")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {moment(row.getValue("created_at")).format("LL")}
          </span>
        </div>
      );
    },
  },
];
