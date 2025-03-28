'use client';

import Image from "next/image";
import Link from "next/link"; // For navigation

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <h1 className="text-2xl sm:text-3xl font-semibold text-white text-center sm:text-left">
          Welcome to the Social Platform
        </h1>
        <p className="text-sm text-gray-600 text-center sm:text-left">
          Explore the most active users and trending posts.
        </p>

        {/* Navigation Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/top-users"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-green-600 text-white gap-2 hover:bg-purple-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Top Users
          </Link>
          <Link
            href="/popularpost"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Popular Posts
          </Link>
          <Link
            href="/latestpost"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Latest Posts
          </Link>
        </div>
      </main>

    </div>
  );
}