
export async function sendProductData(formData, accessToken) {
  try {
    const response = await fetch('http://localhost:8888/product', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Authorization': `${accessToken}`
      },
      // body: JSON.stringify(productDetails),
      body: formData,
    });

    if (response.status !== 200) {
      throw new Error('상품을 게시하는데 문제가 발생했습니다.');
    } else {
      <h2>상품 게시 완료!</h2>
    }
  } catch (error) {
    throw new Error(error.message || '상품을 게시하는데 문제가 발생했습니다.');
  }
}

export async function getPostsFile(accessToken) {
  const response = await fetch('http://localhost:8888/product/page', {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    },
  });
  const data = await response.json();
  return data;
}

export async function getPostsFiles(page, accessToken) {
    const response = await fetch(`http://localhost:8888/product/page?page=${page}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
    });
    const data = await response.json();
    return data;
  }
  
  export async function getPostData(productid, accessToken) {
    const response = await fetch(`http://localhost:8888/product/detail?product_id=${productid}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
    });
    const data = await response.json();
    return data;
  }

  export async function PutPostData(productid, productData, accessToken) {
    const response = await fetch(`http://localhost:8888/product/${productid}`, {
      cache: 'no-store',
      method: 'PUT',
      headers: {
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify({ productData }), // formData
      cache: 'no-store'
    });
  }

  export async function DeletePost(productid, accessToken) {
    const response = await fetch(`http://localhost:8888/product/${productid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
    });

    if (response.status !== 200) {
      throw new Error('상품을 삭제하는데 문제가 발생했습니다.');
    } else {
      console.log('삭제 완료')
    }
  }



  // like 요청

  export async function LikeProduct(accessToken, product_id) {
    try {
      const response = await fetch(`http://localhost:8888/product/like/${product_id}`, {   // 본문에 이메일 넣어서?
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`
        },
      });
      if (!response.ok) {
        throw new Error('좋아요 요청이 실패했습니다.');
    } else {
      console.log("좋아요 성공");
    }
    return response.json(); // 서버에서 JSON 형식의 응답을 반환하는 경우
} catch (error) {
    console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
    throw error;
}
}

  // 사용자 좋아요 목록
  export async function LikeList(accessToken) {
    try {
      const response = await fetch('http://localhost:8888/product/like', {   // 본문에 이메일 넣어서?
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`
        },
      });
      if (!response.ok) {
        console.log("Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('요청을 보내는 중 오류가 발생했습니다.', error);
      throw error;
    }
  }

  export async function DeleteLike(accessToken, productid) {
    try {
      const response = await fetch(`http://localhost:8888/product/like/${productid}`, {   // 본문에 이메일 넣어서?
      method: 'DELETE',  
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`
        },
      });
      if (response.ok) {
        console.log("삭제 성공!");
      }
    } catch (error) {
      console.error('요청을 보내는 중 오류가 발생했습니다.', error);
      throw error;
    }
  }