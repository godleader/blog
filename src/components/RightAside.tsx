"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
} from "@nextui-org/react";
import React from "react";
import Icon from "./Icon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TSavedPost } from "@/lib/types";
import Link from "next/link";
import { useAppSelector } from "@/hooks/reduxHooks";

const RightAside = () => {
  const { authStatus } = useAppSelector((state) => state.auth);

  const { data } = useQuery(["posts", "saved"], {
    queryFn: async (): Promise<TSavedPost[]> => {
      const { data } = await axios.get("/api/posts/saved");
      return data;
    },
  });

  return (
    <aside className=" max-lg:hidden">
      {!authStatus ? (
        <div>
          <Card shadow="none" radius="sm" className="border">
            <CardHeader className="text-2xl font-bold">
              Join the Only in Malaysia Community!
            </CardHeader>
            <CardBody>
              Discover and share the unique cultural experiences, travel
              destinations, and stories that make Malaysia one-of-a-kind. Join
              our community to stay connected!
            </CardBody>
            <CardFooter className="flex-col gap-4">
              <Button
                as={Link}
                href="/signup"
                variant="ghost"
                color="primary"
                radius="sm"
                fullWidth
              >
                Create account
              </Button>
              <Button
                as={Link}
                href="/signin"
                variant="light"
                radius="sm"
                fullWidth
              >
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-medium pb-4 pt-1">My Saved Posts</h4>
          <div>
            {data && data.length > 0 ? (
              data.map((saved) => (
                <Card
                  key={saved.id}
                  radius="sm"
                  shadow="none"
                  className="border mb-2 p-2"
                >
                  <CardBody className="p-2">
                    <div className="flex">
                      <Link
                        className="font-semibold break-all hover:text-primary-600"
                        href={`/${saved.post.author.username}/${saved.post.path}`}
                      >
                        {saved.post.title}
                      </Link>
                    </div>
                  </CardBody>
                  <CardFooter className="p-2 flex justify-between">
                    <User
                      name={saved.post.author.name}
                      description={"@" + saved.post.author.username}
                      avatarProps={{
                        src: saved.post.author.avatar,
                      }}
                      as={Link}
                      href={`/${saved.post.author.username}`}
                    />
                    <div>
                      <Button isIconOnly variant="light">
                        <Icon
                          name="bookmark"
                          strokeWidth={1.25}
                          fill="black"
                        />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>No saved posts yet. Start exploring!</p>
            )}
          </div>
        </div>
      )}

      <Card shadow="none" className="pt-4">
        <CardHeader>
          Only in Malaysia – Your guide to the best cultural experiences,
          travel tips, and hidden gems across Malaysia.
        </CardHeader>
        <CardBody>
          Built with passion to showcase the vibrant culture and diversity of
          Malaysia. Discover Malaysia with us and become part of a growing
          community of explorers!
        </CardBody>
        <CardFooter>Made with love. Only in Malaysia © 2024.</CardFooter>
      </Card>
    </aside>
  );
};

export default RightAside;
