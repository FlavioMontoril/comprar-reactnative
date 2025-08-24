import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import { styles } from './styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filterstatus } from '@/components/Filter'
import { FilterStatus, ProductProps } from '@/types/FilterStatus'
import { Item } from '@/components/Item'
import { useState } from 'react'
import { useProductStore } from '@/store/productsStore'

export function Home() {

  const { products, addProduct } = useProductStore()
  const [status, setStatus] = useState<FilterStatus | null>()
  const [search, setSearch] = useState("")

  function handleAdd() {
    if (!search.trim()) {
      return Alert.alert("Informe a descrição para adicionar um item!")
    }
    const newItem = {
      id: Math.random().toString(36).substring(2),
      description: search,
      status: FilterStatus.PENDING,
    }
    console.log(newItem)
    addProduct(newItem)
  }

  const filterProducts = products
    .filter((item) => {
      if (status) {
        return item.status === status
      }
      return true
    })
    .filter((item) =>
      item.description.toLocaleLowerCase().trim().includes(search.toLocaleLowerCase().trim()))


  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require('@/assets/logo.png')}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <Input value={search} onChangeText={setSearch} placeholder='O que você precisa comprar ?' />
        <Button title='Adicionar' onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>

          <Filterstatus
            status={FilterStatus.DONE}
            isActive={FilterStatus.DONE === status}
            onPress={() => setStatus(FilterStatus.DONE)}
          />
          <Filterstatus
            status={FilterStatus.PENDING}
            isActive={FilterStatus.PENDING === status}
            onPress={() => setStatus(FilterStatus.PENDING)}

          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setStatus(null)}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filterProducts}
          keyExtractor={((item) => String(item.id))}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => console.log('Remover')}
              onStatus={() => console.log('Status')}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (<Text style={styles.empty}>Nenhum Produto encontrado.</Text>)}
        />
      </View>
    </View>
  )
}



