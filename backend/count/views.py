from django.shortcuts import render
import requests
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

BASE_URL = "http://20.244.56.144/test"
AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTU1NTcwLCJpYXQiOjE3NDMxNTUyNzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNmNmJmMTJmLWQzY2QtNDcyZi1hMmNlLWQ4OGM2NmIwNGQ1OCIsInN1YiI6InNhamF5Y2hha3JhdmFydGhpMjAwNEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJTTlNDRSIsImNsaWVudElEIjoiM2Y2YmYxMmYtZDNjZC00NzJmLWEyY2UtZDg4YzY2YjA0ZDU4IiwiY2xpZW50U2VjcmV0IjoiUllnS095T1pXRGFjZWluRyIsIm93bmVyTmFtZSI6IkFqYXkgQ2hha3JhdmFydGhpIiwib3duZXJFbWFpbCI6InNhamF5Y2hha3JhdmFydGhpMjAwNEBnbWFpbC5jb20iLCJyb2xsTm8iOiI3MTMzMjJBRDAwMyJ9.pMp9ni0ayj5ThvH8WLkw7zl-hcNJGLNRRNFEzFz21Oc"

@api_view(['GET'])
def get_posts(request):
    post_type = request.GET.get('type')

    if post_type not in ['popular', 'latest']:
        return Response(
            {"error": "Invalid query param. Use type=popular or type=latest"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        headers = {
        "Authorization": AUTH_TOKEN
    }
        users_response = requests.get("http://20.244.56.144/test/users", headers=headers)
        users_data = users_response.json()
        print("Users API Response:", users_data)

        users = users_data.get("users", {})
        print("Extracted Users:", users)

        all_posts = []

        # Step 2: For each user, get their posts
        for user_id, user_name in users.items():
            posts_url = f"http://20.244.56.144/test/users/{user_id}/posts"
            posts_response = requests.get(posts_url, headers=headers)
            posts_data = posts_response.json()
            posts = posts_data.get("posts", [])

            print(f"{user_name} (ID: {user_id}) has {len(posts)} posts")

            for post in posts:
                post["user_id"] = user_id
                post["user_name"] = user_name

                post_id = post.get("id")
                comments_url = f"http://20.244.56.144/test/posts/{post_id}/comments"
                comments_response = requests.get(comments_url, headers=headers)
                comments_data = comments_response.json()
                comments = comments_data.get("comments", [])

                print(f"Post ID {post_id} → {len(comments)} comments")

                post["comment_count"] = len(comments)
                all_posts.append(post)


        # Step 4: Sort & Slice
        if post_type == "popular":
            sorted_posts = sorted(all_posts, key=lambda x: x["comment_count"], reverse=True)
        else: 
            sorted_posts = sorted(all_posts, key=lambda x: x["id"], reverse=True)

        top_posts = sorted_posts[:5]


        return Response(top_posts, status=status.HTTP_200_OK)

    except Exception as e:
        print("Error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_top_users(request):
    try:
        headers = {
        "Authorization": AUTH_TOKEN
    }
        
        users_response = requests.get(f"{BASE_URL}/users", headers=headers)
        users_response.raise_for_status()
        users_data = users_response.json()
        print("Users API Raw Response:", users_data)

        users = users_data.get("users", {})
        print("Extracted Users Dictionary:", users)

        results = []

        # Step 2: Count posts per user
        for user_id, user_name in users.items():
            try:
                posts_url = f"{BASE_URL}/users/{user_id}/posts"
                posts_response = requests.get(posts_url, headers=headers)
                posts_response.raise_for_status()
                posts = posts_response.json().get("posts", [])
                post_count = len(posts)
            except requests.RequestException as e:
                post_count = 0  # Default to 0 if request fails

            results.append({
                "user_id": user_id,
                "user_name": user_name,
                "post_count": post_count
            })

        # Step 3: Sort and return top 5 users
        top5 = sorted(results, key=lambda x: x["post_count"], reverse=True)[:5]
        return Response(top5, status=status.HTTP_200_OK)

    except requests.RequestException as e:
        return Response({"error": f"Failed to fetch users: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
