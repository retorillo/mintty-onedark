n=0;
echo 
for c in $(echo Red Green Yellow Blue Magenta Cyan)
do
  let n++
  echo -e "    \e[3${n}m$c\e[0m"
done
echo
