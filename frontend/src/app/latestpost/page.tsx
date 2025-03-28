'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

interface Post {
  id: number;
  userid: number;
  content: string;
  user_id: string;
  user_name: string;
  comment_count: number;
}

export default function LatestPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/posts/latest/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
          <Sparkles size={24} className="text-blue-500" /> Latest Posts
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-gray-500">No latest posts found.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-sm rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <h2 className="text-lg font-medium text-gray-900">
                    {post.content || 'Untitled Post'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    by <span className="font-medium">{post.user_name || 'Anonymous'}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{post.comment_count} comments</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}