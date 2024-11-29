import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

interface MenuItem {
  date: string;
  조식: string[];
  중식: {
    A코너: string[];
    B코너: string[];
    셀프코너: string[];
  };
  석식: string[];
}

export default function App() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // App.tsx
  useEffect(() => {
    // URL을 raw 형태로 전달
    const pdfUrl = "http://www.pvv.co.kr/bbs/download.php?bbsMode=fileDown&code=bbs_menu01&id=743&filename=%C6%C7%B1%B311%BF%F94%C1%D6%C2%F7.pdf";
    
    // API 요청 URL 구성
    const apiUrl = new URL('http://localhost:8000/menu');
    apiUrl.searchParams.append('url', pdfUrl);

    console.log('요청 URL:', apiUrl.toString());

    fetch(apiUrl.toString())
      .then(async response => {
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API 에러 응답:', errorText);
          throw new Error(errorText);
        }
        return response.json();
      })
      .then(data => {
        console.log('성공 응답:', data);
        setMenuData(data);
        setError(null);
      })
      .catch(error => {
        console.error('API 요청 실패:', error);
        setError(error.toString());
      });
  }, []);

  if (!menuData || !Array.isArray(menuData)) {
    return (
      <View style={styles.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      {Array.isArray(menuData) && menuData.map((dayMenu, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dateText}>{dayMenu.date}</Text>
          
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>아침</Text>
            {dayMenu.조식.map((item, idx) => (
              <Text key={idx} style={styles.menuItem}>{item}</Text>
            ))}
          </View>

          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>점심</Text>
            <Text style={styles.cornerTitle}>A코너</Text>
            {dayMenu.중식.A코너.map((item, idx) => (
              <Text key={idx} style={styles.menuItem}>{item}</Text>
            ))}
            <Text style={styles.cornerTitle}>B코너</Text>
            {dayMenu.중식.B코너.map((item, idx) => (
              <Text key={idx} style={styles.menuItem}>{item}</Text>
            ))}
          </View>

          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>저녁</Text>
            {dayMenu.석식.map((item, idx) => (
              <Text key={idx} style={styles.menuItem}>{item}</Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  dayContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealContainer: {
    marginBottom: 15,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  cornerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 5,
    marginBottom: 3,
  },
  menuItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
});